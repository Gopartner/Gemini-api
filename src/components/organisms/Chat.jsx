import CardMessage from '@o/CardMessage';

const Chat = () => {
  // ...
  return (
    <div>
      {messages.map((msg, index) => (
        <CardMessage
          key={index}
          message={msg.message}
          sender={msg.sender}
          image={msg.image}
        />
      ))}
    </div>
  );
};
