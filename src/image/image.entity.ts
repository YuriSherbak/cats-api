import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Image {
    @PrimaryColumn()
    public id:string;

    @Column()
    public url: string;

    @Column()
    public key:string;
}
