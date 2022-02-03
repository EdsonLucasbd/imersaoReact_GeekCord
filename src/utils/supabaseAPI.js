import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const getMessagesData = (setList) => {
  supabaseClient
  .from('messageList')
  .select('*')
  .order('id', { ascending: false })
  .then(({ data }) => {
    setList(data);
  })
};

export const insertMessage = (message) => {
  supabaseClient
  .from('messageList')
  .insert([message])
  .then(({ data }) => {
    console.log('nova mensagem: ', data)
  })
};

export const listenRealTimeMessage = (insertNewMessage) => {
  supabaseClient
  .from('messageList')
  .on('INSERT', (data) => { 
    insertNewMessage(data.new);
   })
  .subscribe();
};

export const deleteMessage = async (messageId, setList) => {
  // console.log('clicou para deletar a mensagem de id: ', messageId)
  await supabaseClient
  .from('messageList')
  .delete()
  .match({id: messageId})
  .then(() => {
    getMessagesData(setList)
  })
}