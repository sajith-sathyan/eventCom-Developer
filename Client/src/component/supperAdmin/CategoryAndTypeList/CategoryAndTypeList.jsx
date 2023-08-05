import React from "react";

function CategoryAndTypeList(props) {
  const { CategoryAndType,getindexOfType ,getindexOfCategory} = props;
  

  console.log("CategoryAndType----prpos---->",CategoryAndType)
  
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-row">
          <div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              {/* Table 1 */}
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                {/* Table header */}
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Category
                    </th>
                  </tr>
                </thead>

                {/* Table body */}
                <tbody className="divide-y divide-gray-200">
                  {CategoryAndType != null &&
                    CategoryAndType.Category.map((category, index) => (
                      <tr key={index}>
                        <td onClick={()=>getindexOfCategory(index)} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:bg-gray-200">
                          {category}
                        </td>
                      </tr>
                    ))}
                  {/* ... More rows ... */}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                {/* Table 1 */}
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  {/* Table header */}
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        type
                      </th>
                    </tr>
                  </thead>

                  {/* Table body */}
                  <tbody className="divide-y divide-gray-200">
                  {CategoryAndType != null &&
                      CategoryAndType.Type.map((type, index) => (
                        <tr key={index}>
                          <td 
                          onClick={()=>getindexOfType(index)}
                          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:bg-gray-200">
                            {type}
                          </td>
                        </tr>
                      ))}


                    {/* ... More rows ... */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryAndTypeList;
