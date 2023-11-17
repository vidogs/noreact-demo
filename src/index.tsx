import JSX, {attach, onDomReady, useEffect, useReference, useState} from "@vidog/noreact";
import Component from "@vidog/noreact";

interface ButtonProps {
    onclick: (x: any) => void
    children?: JSX.Element[]
}

function Button(props: ButtonProps): Component {
    return (
        <button onclick={props.onclick}>{props.children}</button>
    )
}

function Counter(): JSX.Element {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('[COUNTER]', 'changed to', counter)
    }, [counter])

    const onButtonClick = () => {
        console.log('[CLICK]')

        setCounter(counter + 1)
    }

    let style = "color: green"

    if(counter >= 5) {
        style = "color: red"
    }

    let el = <p><i>Click button to increase counter value</i></p>

    if(counter >= 5) {
        el = <p><i style="color: red">Too many clicks detected</i></p>
    } else if (counter > 0) {
        el = undefined
    }

    return (
        <>
            <p><b>Count:</b> <span style={style}>{counter}</span></p>
            <div>
                <Button onclick={(_) => onButtonClick()}>Click <b>Me</b>!</Button>
            </div>
            {el}
        </>
    )
}

const initialItems: [boolean, string][] = []

function ToDoList() {
    const [items, setItems] = useState(initialItems)
    const [getInputRef, setInputRef] = useReference<HTMLInputElement>()

    const onButtonClick = () => {
        const inputValue = getInputRef().value

        setItems([...items, [false, inputValue]])
    }

    const onCheckboxClick = (i: string) => {
        items[i][0] = !items[i][0]

        setItems(items)
    }

    const elements = []

    for(let i in items) {
        const item = items[i]

        const title = item[0] ? <s>{item[1]}</s> : item[1]

        const el = <li>
            <input type='checkbox' onchange={() => onCheckboxClick(i)} {...(item[0] ? {checked: true} : {})} />
            {title}
        </li>

        elements.push(el)
    }

    return (
        <>
            <div>
                <ol>
                    {elements}
                </ol>
            </div>
            <div>
                <input type='text' $ref={setInputRef} />
            </div>
            <div>
                <Button onclick={onButtonClick}>Add</Button>
            </div>
        </>
    );
}

function App(): JSX.Element {
    return (
        <div>
            <h1>Hello, world!</h1>
            <Counter />
            <ToDoList />
        </div>
    )
}

onDomReady(() => {
    const root = document.getElementById('root')

    attach(root, <App />);
})
