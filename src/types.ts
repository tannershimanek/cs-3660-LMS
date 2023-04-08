import { ReactNode } from "react";

export enum TableHeaderFields {
  TeamName = "teamName",
  CoachName = "coachName",
  CoachPhone = "coachPhone",
  Actions = "actions",
  NumPlayers = "numPlayers",
}

export type HeaderItem = {
  [key in TableHeaderFields]?: {
    title: string;
    id: TableHeaderFields;
  };
};

export type HeadersArray = HeaderItem[];

export interface TableAppState {
  sortCol: string;
  sortDir: string;
}

export interface RootState {
  table: {
    value: TableData;
  };
}

export type TableHeaderProps = {
  headerObject: HeaderItem;
};

export type TableHeadOptions = {
  title: string;
  id: string;
};

export type TableHead = {
  teamName: TableHeadOptions;
  coachName: TableHeadOptions;
  coachPhone: TableHeadOptions;
  numPlayers: TableHeadOptions;
  actions: TableHeadOptions;
};

export type TableOptions = {
  sortCol: string;
  sortDir: string;
};

export type TableDataObject = {
  id: number;
  teamName: string;
  coachName: string;
  coachPhone: string;
  numPlayers: number;
  image?: string;
};

export interface TableData {
  app: TableAppState;
  data: TableDataObject[];
}

export type TeamTableProps = {
  options: TableOptions;
  data: [TableData];
  headers?: [TableHead];
};

export type SvgElementProps = {
  src: string;
  width?: number;
  height?: number;
};

export type TableRowsProps = {
  rows: [TableData];
};

export type TableRowProps = {
  item: TableDataObject;
};

export type SectionProps = {
  title: ReactNode;
  content: ReactNode;
  counter: string;
  bg: string;
  showAside: boolean;
  className?: string;
};

export interface LayoutProps {
  children: ReactNode;
}

export interface FeaturedImageProps {
  src: string;
  alt: string;
}

export interface AlertState {
  alert: {
    value: {
      message: string;
      showAlert: boolean;
    };
  };
}

export interface ModalState {
  value: {
    showModal: boolean;
  };
}

export interface TableState {
  value: {
    data: TableDataObject[];
    app: {
      sortCol: string;
      sortDir: string;
    };
  };
}
