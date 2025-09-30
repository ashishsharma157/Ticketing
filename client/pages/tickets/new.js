const NewTicket=() => {
    return (
        <div>
            <h1>Create a New Ticket</h1>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" placeholder="Enter price" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewTicket;