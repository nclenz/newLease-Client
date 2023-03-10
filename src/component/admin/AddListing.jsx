import { useContext, useState, useRef, Fragment } from "react"
import AuthContext from "../../Context/AuthProvider"
import Select from "react-select"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import districtData from "../../data/districtData"
import cuisineOptions from "../../data/cuisineOptions"

const AddListing = () => {
  const { auth } = useContext(AuthContext)
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [newListing, setNewListing] = useState({
    user: auth.data.id,
    title: "",
    location: "",
    condition: "Bare",
    rental: 0,
    desc: "",
    cuisine: [],
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append("user", auth.data.id)
      formData.append("title", newListing.title)
      formData.append("location", newListing.location)
      formData.append("condition", newListing.condition)
      formData.append("rental", newListing.rental)
      formData.append("negotiable", newListing.negotiable)
      formData.append("availability", newListing.availability)
      formData.append("cuisine", newListing.cuisine)
      formData.append("desc", newListing.desc)
      formData.append("image", e.target.image.files[0])
      await axios.post("/api/listings/create", formData)
      navigate("/admin")
      console.log(newListing.location)
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(auth)

  return (
    <>
      <form
        encType="multipart/form-data"
        className="space-y-8 divide-y divide-gray-200"
        id="form"
        onSubmit={handleSubmit}
      >
        <div className="mt-20 ml-10 sm:mt-10">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">
                  Add New Listing
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="image">Upload an image:</label>
                      <input
                        className="border rounded-md border-gray-400 "
                        type="file"
                        name="image"
                      />
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="off"
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            title: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-10">
                      <label htmlFor="location">Location: </label>
                      <select
                        className="border border-gray-300 text-lg rounded"
                        id="location"
                        required
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            location: e.target.value,
                          })
                        }
                      >
                        <option value="">Select location</option>
                        {Object.keys(districtData).map((districtCode) => (
                          <option
                            key={districtCode}
                            value={districtData[districtCode].join(", ")}
                          >
                            {districtData[districtCode].join(", ")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-10">
                      <span>
                        <label>Negotiable: </label>
                        <label htmlFor="true">True</label>
                        <input
                          className="border rounded-md border-gray-400 "
                          type="radio"
                          id="true"
                          value="true"
                          name="negotiableOption"
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              negotiable: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="false">False</label>
                        <input
                          type="radio"
                          id="false"
                          value="false"
                          name="negotiableOption"
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              negotiable: e.target.value,
                            })
                          }
                        />
                      </span>
                    </div>

                    <label htmlFor="availability">Availability: </label>
                    <input
                      className="border rounded-md border-gray-400 "
                      type="text"
                      id="availability"
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          availability: e.target.value,
                        })
                      }
                    />

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="rental"
                        className="block text-lg font-medium text-gray-700 "
                      >
                        Rental:
                      </label>
                      <input
                        type="number"
                        name="rental"
                        id="rental"
                        autoComplete="off"
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            rental: e.target.value,
                          })
                        }
                        className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cuisine
                      </label>
                      <Select
                        isMulti
                        options={cuisineOptions}
                        value={selectedCuisines.map((value) => ({ value }))}
                        onChange={(selectedOption) => {
                          setSelectedCuisines(
                            selectedOption.map((option) => option.value)
                          )
                          setNewListing({
                            ...newListing,
                            cuisine: selectedOption.map(
                              (option) => option.value
                            ),
                          })
                        }}
                        getOptionLabel={(option) => option.value}
                        getOptionValue={(option) => option.value}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description:
                      </label>
                      <textarea
                        type="text"
                        name="desc"
                        id="desc"
                        autoComplete="off"
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            desc: e.target.value,
                          })
                        }
                        className="mt-1 block w-80 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="condition:"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Condition::
                      </label>
                      <select
                        id="condition"
                        name="condition"
                        autoComplete="off"
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            condition: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Bare">Bare</option>
                        <option value="Partial Furnish">Partial Furnish</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                      <button
                        type="submit"
                        className="inline-flex justify-center m-10  rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddListing

// <>
//   <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 "></div>
//   <div className="formContainer m-10 p-10">
//     <form
//       encType="multipart/form-data"
//       className="space-y-8 divide-y divide-gray-200"
//       id="form"
//       onSubmit={handleSubmit}
//     >
//       <div className="space-y-8 divide-y divide-gray-200">
//         <div>
//           <div>
//             <h1 className="text-2xl pb-10 font-medium leading-6 text-gray-900">
//               Add Listing
//             </h1>
//           </div>

//           <div className="mt-6  gap-y-6 gap-x-4">
//             <label htmlFor="image">Upload an image:</label>
//             <input
//               className="border rounded-md border-gray-400 "
//               type="file"
//               name="image"
//             />

//             <label htmlFor="title"> Title: </label>
//             <input
//               className="border rounded-md border-gray-400 "
//               type="text"
//               id="title"
//               required
//               onChange={(e) =>
//                 setNewListing({ ...newListing, title: e.target.value })
//               }
//             />

//             <label htmlFor="location">Location: </label>
//             <select
//               className="border rounded-md border-gray-400 "
//               id="location"
//               required
//               defaultValue={districtData[0]}
//               onChange={(e) =>
//                 setNewListing({ ...newListing, location: e.target.value })
//               }
//             >
//               <option value="">Select location</option>
//               {Object.keys(districtData).map((districtCode) => (
//                 <option
//                   key={districtCode}
//                   value={districtData[districtCode].join(", ")}
//                 >
//                   {districtData[districtCode].join(", ")}
//                 </option>
//               ))}
//             </select>
//             <label htmlFor="condition">Condition: </label>
//             <select
//               className="border rounded-md border-gray-400 "
//               type="text"
//               id="condition"
//               required
//               onChange={(e) =>
//                 setNewListing({
//                   ...newListing,
//                   condition: e.target.value,
//                 })
//               }
//             >
//               <option value="Bare">Bare</option>
//               <option value="Partial Furnish">Partial Furnish</option>
//               <option value="Fully Furnished">Fully Furnished</option>
//             </select>
//             <label htmlFor="rental">Rental: </label>
//             <input
//               className="border rounded-md border-gray-400 "
//               type="number"
//               id="rental"
//               min="0"
//               required
//               onChange={(e) =>
//                 setNewListing({ ...newListing, rental: e.target.value })
//               }
//             />
//             <span>
//               <label>Negotiable: </label>
//               <label htmlFor="true">True</label>
//               <input
//                 className="border rounded-md border-gray-400 "
//                 type="radio"
//                 id="true"
//                 value="true"
//                 name="negotiableOption"
//                 onChange={(e) =>
//                   setNewListing({
//                     ...newListing,
//                     negotiable: e.target.value,
//                   })
//                 }
//               />
//               <label htmlFor="false">False</label>
//               <input
//                 type="radio"
//                 id="false"
//                 value="false"
//                 name="negotiableOption"
//                 onChange={(e) =>
//                   setNewListing({
//                     ...newListing,
//                     negotiable: e.target.value,
//                   })
//                 }
//               />
//             </span>
//             <label htmlFor="availability">Availability: </label>
//             <input
//               className="border rounded-md border-gray-400 "
//               type="text"
//               id="availability"
//               autoComplete="off"
//               required
//               onChange={(e) =>
//                 setNewListing({
//                   ...newListing,
//                   availability: e.target.value,
//                 })
//               }
//             />
//             <div>
//               <label>Cuisine:</label>

//               <Select
//                 className="border rounded-md border-gray-400 "
//                 isMulti
//                 options={cuisineOptions}
//                 value={selectedCuisines.map((value) => ({ value }))}
//                 onChange={(selectedOption) => {
//                   setSelectedCuisines(
//                     selectedOption.map((option) => option.value)
//                   )
//                   setNewListing({
//                     ...newListing,
//                     cuisine: selectedOption.map((option) => option.value),
//                   })
//                 }}
//                 getOptionLabel={(option) => option.value}
//                 getOptionValue={(option) => option.value}
//               />
//             </div>
//             <label htmlFor="desc">Description:</label>
//             <textarea
//               className="border rounded-md border-gray-400 "
//               id="desc"
//               onChange={(e) =>
//                 setNewListing({ ...newListing, desc: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="pt-5">
//         <div className="flex justify-end">
//           <button
//             type="reset"
//             className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   </div>
//   <div
//     aria-live="assertive"
//     className="pointer-events-none mt-14 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
//   >
//     <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
//       {/* NOTIFICATION AREA BELOW */}
//       <Transition
//         show={show}
//         as={Fragment}
//         enter="transform ease-out duration-300 transition"
//         enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//         enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//         leave="transition ease-in duration-100"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//           <div className="p-4">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <CheckCircleIcon
//                   className="h-6 w-6 text-green-400"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div className="ml-3 w-0 flex-1 pt-0.5">
//                 <p className="text-sm font-medium text-gray-900">
//                   Successfully saved!
//                 </p>
//                 <p className="mt-1 text-sm text-gray-500">File saved</p>
//               </div>
//               <div className="ml-4 flex flex-shrink-0">
//                 <button
//                   type="button"
//                   className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                   onClick={() => {
//                     setShow(false)
//                   }}
//                 >
//                   <span className="sr-only">Close</span>
//                   <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Transition>
//     </div>
//   </div>
//   <Transition.Root show={open} as={Fragment}>
//     <Dialog
//       as="div"
//       className="relative z-10"
//       initialFocus={cancelButtonRef}
//       onClose={setOpen}
//     >
//       <Transition.Child
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//       </Transition.Child>

//       <div className="fixed inset-0 z-10 overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//               <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                   <ExclamationTriangleIcon
//                     className="h-6 w-6 text-red-600"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Upload Failed
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">Try again.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
//                   onClick={() => setOpen(false)}
//                   ref={cancelButtonRef}
//                 >
//                   Close
//                 </button>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </Dialog>
//   </Transition.Root>
// </>
