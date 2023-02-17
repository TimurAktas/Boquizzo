import { Box, Text } from "native-base";

export type ErrorBarType = {
    errorMessage: string,
};

export const Errorbar: React.FC<ErrorBarType> = ({errorMessage}) => {
    if(errorMessage === '') return null
    return (
        <Box style={{backgroundColor:'#F75D59', height: 30,display: 'flex', alignItems:'center', marginTop: 10, borderRadius:8, maxWidth: 500}}>
            <Text style={{color:'white', marginLeft: 8}}>{errorMessage}</Text>
        </Box>
    )
};
