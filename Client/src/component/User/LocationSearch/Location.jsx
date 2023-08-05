import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';


function Map(props) {
    const {LocationAddress}= props
    const [address, setAddress] = useState('')
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

    LocationAddress(address)


    function sendCoordinates(latLng) {
        props.onSendCoordinates(latLng.lat, latLng.lng);
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)
        sendCoordinates(latLng)

    }
    return (
        <div>
            {/* This my Google Places */}
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                     
                        <div >
                            <input className="text- sm:text-base placeholder-gray-500 pl-10 pr-4  border border-gray-200 w-full py-2 focus:outline-none focus:border-blue-400"
                                {...getInputProps({ placeholder: "search location" })}
                            />
                        </div>

                        <div >
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestions,index) => {

                                const style = {
                                    backgroundColor: suggestions.active ? '#41b6e6' : '#fff'
                                }

                                return (<div   {...getSuggestionItemProps(suggestions, { style })}>
                                    {suggestions.description}
                                </div>
                                )

                            })}
                        </div>
                    </div>

                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default Map