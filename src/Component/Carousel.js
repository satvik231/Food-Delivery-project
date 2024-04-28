const Carousel = ({img,name})=>{
    return(
        <div className="Carousel">
        <div>
            <img src={img} 
                alt="restroimg" 
                width="150px"
                style={{height:"auto",
                objectFit: "cover"}}/>
        
        </div>
        </div>
    )
}

export default Carousel;