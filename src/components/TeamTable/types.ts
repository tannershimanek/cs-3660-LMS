export type TableHeadOptions = {
    title: string;
    id: string;
  };
  
  export  type TableHead = {
    teamName: TableHeadOptions;
    coachName: TableHeadOptions;
    coachPhone: TableHeadOptions;
    numPlayers: TableHeadOptions;
    actions: TableHeadOptions;
  };
  
  export  type TableOptions = {
    sortCol: string;
    sortDir: string;
  };
  
  export type TableData = {
    id: number;
    teamName: string;
    coachName: string;
    coachPhone: string;
    numRiders: number;
  };
  
  export type TeamTableProps = {
    options: TableOptions;
    data: [TableData];
    headers?: [TableHead];
  };