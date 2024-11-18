"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale"; // Importer la locale française
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { api_url, NotificationType } from "@/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [lastFetchedId, setLastFetchedId] = useState<number | null>(null);
  const candidat_id = () => {
    // Récupérer le candidat_id de la session (localStorage ou cookies)
    const savedCandidatId = sessionStorage.getItem("candidat_id");
    return savedCandidatId ? Number(savedCandidatId) : 0;
  };
  const { toast } = useToast();

  // Fonction pour récupérer les notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        api_url + `candidat/${candidat_id()}/notification`
      ); // Remplacez par votre endpoint API
      const data: NotificationType[] = await response.data;

      // Trier les notifications du plus récent au plus ancien
      const sortedNotifications = [...data].sort(
        (a, b) =>
          new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
      );

      // Détecter les nouvelles notifications
      const newNotifications = sortedNotifications.filter(
        (notification) => !lastFetchedId || notification.id > lastFetchedId
      );

      if (newNotifications.length > 0) {
        // Afficher un toast pour chaque nouvelle notification
        newNotifications.forEach((notification) =>
          toast({
            variant: "default",
            title: "Nouvelle notification",
            description: notification.message,
          })
        );

        // Mettre à jour l'ID de la dernière notification récupérée
        setLastFetchedId(newNotifications[0].id);
      }

      setNotifications(sortedNotifications);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications :",
        error
      );
    }
  };

  // Fetch périodique toutes les 10 secondes
  useEffect(() => {
    fetchNotifications(); // Fetch initial
    const interval = setInterval(fetchNotifications, 10000); // 10 secondes
    return () => clearInterval(interval); // Nettoyage
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-4 last:mb-0">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">
                      {notification.destinataire}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(parseISO(notification.dateHeure), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
