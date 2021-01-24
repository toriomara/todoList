import React, {useState, ChangeEvent, KeyboardEvent} from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(itemTitle)
        } else {
            setError("Title is required")
        }
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>
                {error}
            </div>}
        </div>
    )
}


/*
<AppBar position="static">
    <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
        </IconButton>
        <Typography variant="h6">
            News
        </Typography>
        <Button color="inherit">Login</Button>
    </Toolbar>
</AppBar>
*/
