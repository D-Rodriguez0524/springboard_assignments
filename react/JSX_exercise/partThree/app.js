const App = () => {
    return (
        <div>
            <Person
                name="Quagmire"
                age={58}
                hobbies={["Giggity", "Giggity", "Goo"]}
            />
            <Person
                name="Peter Griffin"
                age={43}
                hobbies={["eating", "finding Mr. Chicken", "annoying lois"]}
            />
            <Person
                name="Stewie"
                age={3}
                hobbies={["causing mayhem", "ploting against lois", "creating time machines"]}
            />
        </div>
    )
}