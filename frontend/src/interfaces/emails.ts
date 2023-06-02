export interface Sender {
    id:string,
	name: string;
	email:string;
}

export interface Reply {
    id:string;
	sentAt:string;
	body:string;
	sender:Sender;
}

export interface Emails {
    id:string,
	name: string;
	email: string;
	subject: string;
    createdAt:string;
	emailReply:Reply;
	sentAt:string;
	body:string;
}
