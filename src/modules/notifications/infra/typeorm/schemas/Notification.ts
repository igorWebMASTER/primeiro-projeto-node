import {
    ObjectID,
    Entity,
    CreateDateColumn,
    Column,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Notifications')
class Notification {
    id: ObjectID;

    content: string;

    recipient_id: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Notification;
