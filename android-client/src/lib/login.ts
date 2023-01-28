interface Props {
  UserName: string;
  Password: string;
}

export const login = ({ UserName, Password }: Props) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      UserName,
      Password,
    }),
  };

  fetch(`http://192.168.43.27:3005/api/teacher/login`, options)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log('data : ', data);
        return data;
      }
    })
    .catch((error) => {
      console.log('error : ', error);
      return null;
    });
};
