import {
    AfterInsert,
    AfterRemove,
    AfterUpdate, // This is a Hooks
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Deleted ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update ${this.id}`);
    }
}
