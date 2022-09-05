import { Button, Input, Modal } from 'antd';
import Message from '../../app/ui/Message';
import styles from './Dialog.module.css';
import { useRef, useState } from 'react';
import { useUsername } from '../../app/hooks/useUsername';
import { useMessages } from '../../app/hooks/useMessages';

const Dialog = () => {
  const ref = useRef(null);
  const {message, setMessage, messages, sendMessage, loadNextMessages } = useMessages(ref);
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const { username, changeUsername } = useUsername();

  return (
    <div className={styles.appContainer}>
      <ul onScrollCapture={loadNextMessages} ref={ref} className={styles.messageList}>
        {messages.map(messageMeta => (
          <Message
            key={messageMeta.timestamp}
            {...messageMeta}
            isCurrentUser={username === messageMeta.username}
          />
        ))}
      </ul>
      <div className={styles.addMessage}>
        <Input
          value={message}
          onPressEnter={() => sendMessage(username)}
          onInput={(e) => setMessage((e.target as HTMLInputElement).value)}
          placeholder="Send a message..."
        />
        <Button type="primary" disabled={!message.length} onClick={() => sendMessage(username)}>Send</Button>
      </div>

      <Modal
        closable={false}
        title="Username"
        cancelButtonProps={{ hidden: true }}
        visible={modalIsVisible}
        onOk={() => username && setModalIsVisible(false)}
      >
        <Input
          placeholder="Enter your name..."
          value={username}
          onPressEnter={(e) => {
            changeUsername(e);
            username && setModalIsVisible(false);
          }}
          onInput={changeUsername}
        />
      </Modal>
    </div>
  )
};

export default Dialog;
