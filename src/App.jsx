import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Axios = () => {

    const [data, setdata] = useState({
        name: '',
        email: '',
    })

    const [show, setshow] = useState([])
    const [update, setUpdate] = useState([])

    const handleOnChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        axios.post('http://localhost:3030/posts', data)
            .then((res) => {
                setshow([...show, res.data])
                console.log(res);
                fetch()
            })
    }


    const handleEdit = (index) => {
        let all = show[index]
        setUpdate(all)
        console.log(all);
    }

    const handlefinalupdate = (id) => {
        axios.put(`http://localhost:3030/posts/${id}`, update).then((res) => {
            console.log(res);
            fetch()
        })

    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
            const filter = show.filter((item) => item.id !== id);
            setshow(filter);
            fetch()
        })
    }

    const fetch=()=>{
        axios.get("http://localhost:3030/posts").then((res) => {
            setshow(res.data);
        })
    }

    useEffect(() => {
       fetch()
    }, [])

    const hendaleupdate = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div>
                <input type="text" name='name' onChange={handleOnChange} />
                <input type="text" name='email' onChange={handleOnChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div>
                <input type="text" onChange={hendaleupdate} value={update.name} name='name' />
                <input type="text" onChange={hendaleupdate} value={update.email} name='email' />
                <button onClick={() => handlefinalupdate(update.id)}>update</button>
            </div>

            {show.map((item, index) => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <h2>{item.email}</h2>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>delete</button>

                </div>
            ))}
        </>
    )
}

export default Axios
