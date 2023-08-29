
export const isLastMessage = (allMessages,message ,index) => {
  return ( index === allMessages.length - 1 || allMessages[index + 1]?.sender._id !== message.sender._id);
}
