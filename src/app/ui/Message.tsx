interface IMessageProps {
  message:string;
  isCurrentUser?: boolean;
  username: string;
  timestamp: number;
}

const Message = ({ username, message, isCurrentUser = false }: IMessageProps) => (
  <li style={{alignSelf: isCurrentUser ? 'flex-end' : '', textAlign: isCurrentUser ? 'end' : undefined}}>
    <h4>{isCurrentUser ? 'You' : username }:</h4>
    <p>
      <span>{message}</span>
    </p>
  </li>
)

export default Message;
