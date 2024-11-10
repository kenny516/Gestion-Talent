import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function EmployeesPage() {
  // TODO: Fetch employees from API
  const employees = [
    {
      id: 1,
      nom: "Smith",
      prenom: "Jane",
      email: "jane@example.com",
      telephone: "+261 34 00 000 00",
      date_embauche: "2023-01-15",
      poste_id: 1,
      competences: [
        { id: 1, nom: "React", description: "Frontend Development", niveau: 5 },
        { id: 2, nom: "Node.js", description: "Backend Development", niveau: 4 }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Liste des Employés</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Link href={`/employees/${employee.id}`} key={employee.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {employee.prenom[0]}{employee.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{`${employee.prenom} ${employee.nom}`}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Date d&apos;embauche:</span>{" "}
                      {new Date(employee.date_embauche).toLocaleDateString()}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                      Poste #{employee.poste_id}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Compétences:</h4>
                    <div className="flex flex-wrap gap-2">
                      {employee.competences.map((skill) => (
                        <Badge key={skill.id} variant="outline">
                          {skill.nom} ({skill.niveau}/5)
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}