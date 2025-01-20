



const deleteConversation = ({ id, title, submit }) => {
    const deleteConfirm = confirm(`Are you sure you want to delete this conversation? This action cannot be undone.`);

    if (!deleteConfirm) return;

   submit(
    {
        request_type: 'delete_conversation',
        conversation_id: id,
        conversation_title: title,
    },
    {
        method: 'DELETE',
        encType: 'application/x-www-form-urlencoded',
        action: '/',
    }
   )
}

export default deleteConversation;