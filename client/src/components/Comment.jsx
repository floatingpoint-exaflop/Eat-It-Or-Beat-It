

function getStars(stars) {
    const stars = 3;
    let starString = ''

    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starString += '★ '
        } else {
            starString += '0 '
        }
    }
    return starString
}



export default function Comment(props) {

    return (
        <>
            {/* <h3>{props.username}</h3>  may need to be changed based on how user is passed through */}
            <p>
                { getStars(props.rating)}
            </p>
            <p>{props.commentBody}</p>
        </>
    )
}