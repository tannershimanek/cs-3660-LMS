import { HeadersArray, TableHeaderFields } from "../types";

export const headers: HeadersArray = [
  { teamName: { title: "Team name", id: TableHeaderFields.TeamName } },
  { coachName: { title: "Coach name", id: TableHeaderFields.CoachName } },
  { coachPhone: { title: "Coach Phone", id: TableHeaderFields.CoachPhone } },
  { numPlayers: { title: "# of riders", id: TableHeaderFields.NumPlayers } },
  { actions: { title: "Actions", id: TableHeaderFields.Actions } },
];
