import { Text, Box, Pressable, Badge, HStack, CheckIcon, SunIcon, Avatar } from "native-base";
import { useEffect, useState } from "react";
import {API_URL} from '../../config/config'

export type UserAvatarType = {
    key: number,
    userId: string,
};

export const UserAvatar: React.FC<UserAvatarType> = (data) => {
    const catAvatar = require('../../assets/img/illustration/catAvatar.jpg');
    const [nickname, setNickname] = useState(null)

    useEffect(() => {
        console.log("Get User With ID: ", data.userId)
        getUserFromDB()
    },[])

    const getUserFromDB = async () => {
        const response = await fetch(`${API_URL}/users/`+ data.userId);
        const json = await response.json();
        setNickname(json.nickname)
    }

    return (
        <Box key={data.key} style={{marginRight:5, maxWidth:80, justifyContent:'center', alignItems:'center'}}>
            <Avatar bg="green.500" source={catAvatar}></Avatar>
            {nickname ? <Text color={'black'} bold fontSize={16} maxH={16}>{nickname}</Text>:<Text color={'black'}>{data.userId}</Text>}
        </Box>
      );
};
