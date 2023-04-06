export const NoMatch = () => {
    document.title = '404: Not Found';
    return (
        <div className={'text-center mt-5'} style={{height: "60vh"}}>
            <h1>404: Not Found</h1>
        </div>
    )
};