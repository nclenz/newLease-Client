import { useContext, lazy, Suspense } from "react"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"

const AuthNavDropdown = lazy(() => import("./AuthNavDropdown"))
const AuthMobileNavDropdown = lazy(() => import("./AuthMobileNavDropdown"))
const NavElements = lazy(() => import("./NavElements"))

const Navbar = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <a href="/">newLease</a>
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/SGFoodStallLogo.jpg"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {/*If admin sign in, show elements else show null */}
                  {auth.data?.username ? <NavElements /> : null}
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {auth.data?.username ? (
                  <Suspense fallback={<h1>Loading....</h1>}>
                    <AuthNavDropdown />
                  </Suspense>
                ) : (
                  <a
                    type="button"
                    href="#"
                    className="flex-shrink-0 rounded bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                  >
                    <span className="sr-only">Sign In</span>
                    <h3
                      className="text-lg font-medium"
                      onClick={() => navigate("/login")}
                    >
                      Admin Login
                    </h3>
                  </a>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => navigate("/admin")}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Manage Listing
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {auth.data?.username}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 ">
                {auth.data?.username ? (
                  <AuthMobileNavDropdown />
                ) : (
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={() => navigate("/login")}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign In
                  </Disclosure.Button>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
