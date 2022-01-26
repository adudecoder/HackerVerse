export default function PaginaDoChat() {

    fetch('https://api.github.com/users/adudecoder')
    .then(function(respostaDoServidor) {
        return respostaDoServidor.json()
    })
    .then(function(respostaConvertida) {
        return respostaConvertida
    })

    function Title(props) {
        const Tag = props.tag;
        <Tag>{props.children}</Tag>
        return (
            <style jsx>{`
                h1 {
                    right: 50px;
                    position: absolute;
                }

                img {
                    position: relative;
                }
            `}</style>
        )
    }

    return (
        <>
            <h1>Projeto AluraCord</h1>
            <img src="https://c4.wallpaperflare.com/wallpaper/184/693/75/bleach-kuchiki-rukia-wallpaper-preview.jpg"></img> 
        </>
    )
}