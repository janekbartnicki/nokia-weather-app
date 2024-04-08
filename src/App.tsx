import Footer from "./components/Footer";
import Countries from "./components/Countries";
import Cities from "./components/Cities";

const App: React.FC = () => {

    return (
        <>
            <div className="text-center text-6xl font-thin my-24">
                FreshAir<sup className="text-4xl">&copy;</sup>
            </div >

            {/* this section will be hidden on moblie */}
            <div className="hidden lg:block">
                <Countries/>
            </div>
            <div id='cities-comparison'>
                <Cities/>
            </div>
            
            <Footer/>
        </>
    )
}

export default App;