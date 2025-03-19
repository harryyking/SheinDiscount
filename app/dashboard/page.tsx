import ProductList from '@/components/ProductList';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default function DashboardPage() {
 
  // const session = await getServerSession(authOptions)
  // const userEmail = session?.user.email
  // const findUserInDB = await prisma.user.findUnique({
  //   where:{email: userEmail},
  //   select: {id : true}
  // })


  // if (!findUserInDB) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="card bg-base-100 shadow-xl">
  //         <div className="card-body">
  //           <h2 className="card-title">Authentication Required</h2>
  //           <p>Please log in to access the dashboard.</p>
  //           <div className="card-actions justify-end mt-4">
  //             <Link href="/login" className="btn btn-primary">
  //               Log In
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 bg-base-100 shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold">Price Tester</h2>
        </div>
        <ul className="menu p-4 text-base-content w-full">
          <li>
            <Link href="/dashboard" className="active">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products">
              My Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/analytics">
              Analytics
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings">
              Settings
            </Link>
          </li>
          <li>
            <button>
              Sign Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <button 
              className="btn btn-primary" 
            >
              Add New Product
            </button>
          </div>

          {/* Create Product Form */}
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title">Add New Product</h2>
                <form>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">Price ($)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  {/* {errorMessage && (
                    <div className="alert alert-error mt-4">
                      {errorMessage}
                    </div>
                  )} */}

                  <div className="card-actions justify-end mt-6">
                    <button
                      type="button"
                      className="btn btn-ghost"

                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {/* {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        'Save Product'
                      )} */}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          {/* Product List */}
          {/* <ProductList userId={findUserInDB.id} /> */}
        </div>
      </div>
    </div>
  );
}