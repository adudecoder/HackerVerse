import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';


function Title(props) {
    console.log(props.children);
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.person.white};
                    font-size: 30px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

// Componente React
// function HomePage() {
//     //JSX
//     return (
//         <div style={{ backgroundColor: 'black' }} >
//             <GlobalStyle />
//             <Title tag="h2">Heyy, happy you're back</Title>
//             <h2>Coffee and Chat</h2>
//         </div>
//     )
// }
  
// export default HomePage

export default function PaginaInicial() {
    // const username = 'adudecoder';
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState("")
    const roteamento = useRouter();
    const errorImage = '/img/img-loading.gif';
    const [userExiste, setUserExiste] = React.useState(false);

    return (
        <>
            {/* box */}
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(/img/banner-chat.png)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundAttachment: 'fixed',
                }}
            >
                {/* box-center */}
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '52px', margin: '16px',
                        backgroundColor: appConfig.theme.colors.person.transparent_black,
                    }}
                >

                    {/* formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            if (userExiste) {
                                appConfig.username = username;
                                roteamento.push(`/chat?username=${username}`);
                                // window.location.href = '/chat';
                            }
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <img src={`/img/avatar.png`}></img>
                        <Title tag="h1">Welcome to HackerVerse</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/* <input 
                            type="text"
                            value={username}
                            onChange={function handler(event) {
                                console.log("usuario digitou", event.target.value);
                    
                                // Onda ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // Através do React e avise quem precisa
                                setUsername(valor);
                            }}
                        /> */}

                        <Text
                            tag="label"
                            className="userNotFound"
                            styleSheet={{
                                color: "red",
                                fontSize: "14px",
                                fontWeight: "300",
                                alignSelf: "start",
                                padding: "3px",
                            }}

                        >
                            {userExiste ? "" : "User not found"}
                        </Text>
                        <TextField

                        // <TextField
                        // value={username}
                        // onChange={function handler(event) {
                        
                        // // Onda ta o valor?
                        // const valor = event.target.value;

                        // // Trocar o valor da variavel
                        // // Através do React e avise quem precisa
                        // setUsername(valor);
                        // }}

                            onChange={event => {
                                fetch(`https://api.github.com/users/${event.target.value}`)
                                    .then(async data => {
                                        var obj = await data.json()
                                        if (obj.message == undefined) {
                                            setUserExiste(true)
                                            setName(obj.name)
                                            setUsername(obj.login)
                                        }
                                        else if (obj.message == "Not Found" || event.target.value == "") {
                                            setUserExiste(false)
                                            setName("")
                                            setUsername("User not found")
                                        }
                                        else {
                                            setUserExiste(true)
                                            setName("")
                                            setUsername(event.target.value)
                                        }
                                    })
                                    .catch(error => {
                                        // console.log(error)
                                        return ''
                                    })
                            }}
                            placeholder="GitHub User"
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: userExiste ? appConfig.theme.colors.neutrals[900] : "red",
                                    mainColorHighlight: userExiste ? appConfig.theme.colors.primary[500] : "red",
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Enter'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.person.black,
                                mainColor: appConfig.theme.colors.person.button,
                                mainColorLight: appConfig.theme.colors.person.button,
                                mainColorStrong: appConfig.theme.colors.person.button,
                            }}
                            styleSheet={{
                                border: '1px solid #2d2d2d',
                            }}
                        />
                    </Box>
                    {/* end formulário */}

                    {/*  Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '250px',
                            padding: '16px',
                            backgroundColor: 'trasnparent',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                boxShadow: '0 0 5px 0 #fff',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : errorImage}
                        />

                        <a
                            href={`https://github.com/${username}`}
                            target={'_blank'}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.person.white,
                                    padding: '5px 15px',
                                    borderRadius: '1000px',
                                    fontSize: '16px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.person.grey1,
                                    }
                                }}
                            >
                                {username}
                            </Text>
                        </a>

                    </Box>
                    {/*  end Photo Area */}
                </Box>
                {/* end box-center */}
            </Box>
            {/* end box */}
        </>
    );
}