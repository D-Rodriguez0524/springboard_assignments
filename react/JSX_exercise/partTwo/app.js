const App = () => (
    <div>
        <Tweet username="cereal08"
            name="Johnny"
            message="i like cereal"
            date={new Date().toDateString()}
        />
        <Tweet username="eminem"
            name="Candy"
            message="i like M&M's"
            date={new Date().toDateString()}
        />
        <Tweet username="kitkat"
            name="Kitty"
            message="i like cats and chocolate"
            date={new Date().toDateString()}
        />
        <Tweet username="peanut"
            name="Butter"
            message="#PeanutButter"
            date={new Date().toDateString()}
        />
    </div>
)

