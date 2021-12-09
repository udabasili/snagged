const { database, f } = require("../../services/firebase");


class ChatService{

    /**
     *
     * This sets the ref we would be using
     * @readonly
     * @memberof ChatService
     */
    get ref(){
        return database.ref('messages');
    }

    /**
     *This takes a function as a param and this function is  ru
     *
     * @param {*} callback
     * @memberof ChatService
     */
    messagesListener = callback => {
        this.ref.limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    parse = snapshot => {
        const { timestamp, text, user} = snapshot.val();
        const {key: _id} = snapshot
        const message = {
            _id,
            timestamp,
            text, 
            user
        }

        return message
    }

    sendMessage(messages){
        let timestamp = f.database.ServerValue.TIMESTAMP;
        for(let i; i < messages.length ; i++){
            const { text, user} = messages[i];
            const message = {
                text,
                user,
                timestamp
            }
            this.ref.push(message)

        }

    }


    endRef(){
        this.ref.off();
    }
}