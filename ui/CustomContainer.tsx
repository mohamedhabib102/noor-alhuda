"use client"
interface ContainerProps{
    children: React.ReactNode;
}
const CustomContainer : React.FC<ContainerProps>  = ({children}) =>{
    return(
        <div className="container mx-auto lg:px-8 md:px-4 px-2.5">
            {children}
        </div>
    )
}
export default CustomContainer;