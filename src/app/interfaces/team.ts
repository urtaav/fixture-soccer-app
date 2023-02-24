export interface ITeam {
    id:number;
    name:string;
    description:string;
    image:string;
    players:IPlayer[]
}

export interface IPlayer {
    id:number;
    name:string;
    position: string;
    number: number;

}