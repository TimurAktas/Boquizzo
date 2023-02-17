import { Box, Avatar } from "native-base";
import { GetUserNickname } from "../../utils/utils";

export type UserAvatarType = {
    key: number,
    userId: string,
};

export const UserAvatar: React.FC<UserAvatarType> = (data) => {
    const catAvatar = require('../../assets/img/illustration/catAvatar.jpg');
    return (
        <Box key={data.key} style={{marginRight:5, maxWidth:80, justifyContent:'center', alignItems:'center'}}>
            <Avatar bg="green.500" height={16} width={16} source={catAvatar}></Avatar>
            <GetUserNickname userId={data.userId} />
        </Box>
    );
};
