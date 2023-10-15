const MAX_NAME_LENGTH = 6;

const Person = ({ name, age, hobbies }) => {
    let voteText = age >= 18 ? "Go vote" : "Go Home";

    const hobbyLis = hobbies.map(h => <li>{h}</li>);

    return (
        <div>
            <p>Learn some information about this person:</p>
            <ul>
                <li> Name: {name.slice(0, MAX_NAME_LENGTH)}</li>
                <li>Age: {age} </li>
                <ul>
                    Hobbies: {hobbyLis}
                </ul>
            </ul>
            <h3>{voteText}</h3>
        </div>
    )
}