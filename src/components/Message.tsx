function Message(props: { children: React.ReactNode }) {
  const { children } = props;
  console.log(props);

  return <div>{children}</div>;
}

export default Message;
