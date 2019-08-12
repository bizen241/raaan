export const SessionsPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <UserSessionList
      title="セッション一覧"
      initialSearchParams={{
        userId: currentUser.id
      }}
    />
  );
};
