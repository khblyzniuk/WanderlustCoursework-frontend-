import Header from "@/modules/header";
import TouristPlacesList from "@/modules/tourist-places-list";

// @ts-ignore
export default function TouristPlacesPage({touristPlaces}) {
  return (<>
      <Header />
        <TouristPlacesList touristPlaces={touristPlaces}/>
    </>
  )
}

export async function getStaticProps(){
    try {
        const response = await fetch('http://localhost:5199/api/tourist-place');
        const data = await response.json();
        return {
            props: {
                touristPlaces: data
            },
        };
    } catch (error) {
        throw error;
    }
}