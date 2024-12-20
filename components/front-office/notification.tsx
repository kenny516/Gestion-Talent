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
  const [pastNotifications, setPastNotifications] = useState<
    NotificationType[]
  >([]);
  const [newNotifications, setNewNotifications] = useState<NotificationType[]>(
    []
  );
  const candidat_id = () => {
    // Récupérer le candidat_id de la session (localStorage ou cookies)
    const savedCandidatId = sessionStorage.getItem("candidat_id");
    return savedCandidatId ? Number(savedCandidatId) : 0;
  };
  const { toast } = useToast();
  // Fetch past notifications
  const fetchPastNotifs = async () => {
    try {
      const response = await axios.get(
        api_url + `candidat/${candidat_id()}/notification/read`
      );
      const data: NotificationType[] = response.data;

      // Sort notifications by date (latest first)
      const sortedNotifications = [...data].sort(
        (a, b) =>
          new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
      );

      setPastNotifications(sortedNotifications);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications passées :",
        error
      );
    }
  };

  // Fetch new notifications
  const fetchNewNotifs = async () => {
    try {
      const response = await axios.get(
        api_url + `candidat/${candidat_id()}/notification/non-read`
      );
      const data: NotificationType[] = response.data;

      data.forEach((notification) =>
        toast({
          variant: "default",
          title: "Nouvelle notification",
          description: notification.message,
        })
      );
      // Add new notifications to the state, ensuring no duplicates
      setNewNotifications((prevNewNotifications) => {
        const existingIds = new Set(
          prevNewNotifications.map((notif) => notif.id)
        );
        const filteredNew = data.filter((notif) => !existingIds.has(notif.id));
        return [...filteredNew, ...prevNewNotifications];
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des nouvelles notifications :",
        error
      );
    }
  };

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
  // Fetch notifications on initial load
  useEffect(() => {
    fetchPastNotifs(); // Fetch past notifications
    fetchNewNotifs(); // Initial fetch for new notifications
    const interval = setInterval(fetchNewNotifs, 10000); // Fetch new notifications every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          {newNotifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Nouvelles Notifications
              </h2>
              {newNotifications.map((notification) => (
                <div key={notification.id} className="mb-4 last:mb-0">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(
                            parseISO(notification.dateHeure),
                            {
                              addSuffix: true,
                              locale: fr,
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm">{notification.message}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Notifications Passées
            </h2>
            {pastNotifications.map((notification) => (
              <div key={notification.id} className="mb-4 last:mb-0">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
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
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
