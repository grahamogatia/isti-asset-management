import type { Asset_Category, Asset_Sub_Category, Asset_Type } from "@/data/types";
import { 
  useCategories, 
  useSubCategories, 
  useTypes 
} from "@/hooks/useCategory";

function Dashboard() {
  // ✅ Test all your hooks
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError, 
    isError: categoriesIsError, 
    isSuccess: categoriesIsSuccess 
  } = useCategories();

  const { 
    data: subCategories, 
    isLoading: subCategoriesLoading, 
    error: subCategoriesError, 
    isError: subCategoriesIsError, 
    isSuccess: subCategoriesIsSuccess 
  } = useSubCategories();

  const { 
    data: types, 
    isLoading: typesLoading, 
    error: typesError, 
    isError: typesIsError, 
    isSuccess: typesIsSuccess 
  } = useTypes();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🧪 All Hooks Test Dashboard</h1>
      
      {/* Overall Status */}
      <div style={{ 
        background: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2>📊 Overall Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <h4>Categories</h4>
            <p>🔄 Loading: {categoriesLoading ? '✅' : '❌'}</p>
            <p>✅ Success: {categoriesIsSuccess ? '✅' : '❌'}</p>
            <p>❌ Error: {categoriesIsError ? '✅' : '❌'}</p>
            <p>📊 Count: {categories?.length || 0}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4>Sub Categories</h4>
            <p>🔄 Loading: {subCategoriesLoading ? '✅' : '❌'}</p>
            <p>✅ Success: {subCategoriesIsSuccess ? '✅' : '❌'}</p>
            <p>❌ Error: {subCategoriesIsError ? '✅' : '❌'}</p>
            <p>📊 Count: {subCategories?.length || 0}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4>Asset Types</h4>
            <p>🔄 Loading: {typesLoading ? '✅' : '❌'}</p>
            <p>✅ Success: {typesIsSuccess ? '✅' : '❌'}</p>
            <p>❌ Error: {typesIsError ? '✅' : '❌'}</p>
            <p>📊 Count: {types?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Error States */}
      {(categoriesIsError || subCategoriesIsError || typesIsError) && (
        <div style={{ 
          background: '#ffebee', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#c62828'
        }}>
          <h3>❌ Errors Found:</h3>
          {categoriesIsError && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Categories Error:</strong>
              <pre style={{ background: 'white', padding: '10px', fontSize: '12px' }}>
                {categoriesError instanceof Error ? categoriesError.message : JSON.stringify(categoriesError, null, 2)}
              </pre>
            </div>
          )}
          {subCategoriesIsError && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Sub Categories Error:</strong>
              <pre style={{ background: 'white', padding: '10px', fontSize: '12px' }}>
                {subCategoriesError instanceof Error ? subCategoriesError.message : JSON.stringify(subCategoriesError, null, 2)}
              </pre>
            </div>
          )}
          {typesIsError && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Types Error:</strong>
              <pre style={{ background: 'white', padding: '10px', fontSize: '12px' }}>
                {typesError instanceof Error ? typesError.message : JSON.stringify(typesError, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Loading States */}
      {(categoriesLoading || subCategoriesLoading || typesLoading) && (
        <div style={{ 
          background: '#e3f2fd', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>🔄 Loading...</h3>
          <ul>
            {categoriesLoading && <li>Loading categories...</li>}
            {subCategoriesLoading && <li>Loading sub categories...</li>}
            {typesLoading && <li>Loading asset types...</li>}
          </ul>
        </div>
      )}

      {/* Success States - Categories */}
      {categoriesIsSuccess && categories && (
        <div style={{ 
          background: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>✅ Categories ({categories.length} found):</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '15px' }}>
            {categories.map((category: Asset_Category) => (
              <div key={category.category_id} style={{ 
                background: 'white', 
                padding: '10px', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <strong>#{category.category_id}</strong> - {category.category_name}
              </div>
            ))}
          </div>
          
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🔍 View Raw Categories Data
            </summary>
            <pre style={{ 
              background: 'white', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '11px',
              maxHeight: '200px'
            }}>
              {JSON.stringify(categories, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Success States - Sub Categories */}
      {subCategoriesIsSuccess && subCategories && (
        <div style={{ 
          background: '#fff3e0', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>✅ Sub Categories ({subCategories.length} found):</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginBottom: '15px' }}>
            {subCategories.map((subCategory: Asset_Sub_Category) => (
              <div key={subCategory.sub_category_id} style={{ 
                background: 'white', 
                padding: '10px', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <div><strong>#{subCategory.sub_category_id}</strong> - {subCategory.sub_category_name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Category ID: {subCategory.category_id}
                </div>
              </div>
            ))}
          </div>
          
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🔍 View Raw Sub Categories Data
            </summary>
            <pre style={{ 
              background: 'white', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '11px',
              maxHeight: '200px'
            }}>
              {JSON.stringify(subCategories, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Success States - Types */}
      {typesIsSuccess && types && (
        <div style={{ 
          background: '#f3e5f5', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>✅ Asset Types ({types.length} found):</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginBottom: '15px' }}>
            {types.map((type: Asset_Type) => (
              <div key={type.type_id} style={{ 
                background: 'white', 
                padding: '10px', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <div><strong>#{type.type_id}</strong> - {type.type_name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Sub Category ID: {type.sub_category_id} | Code: {type.type_code}
                </div>
              </div>
            ))}
          </div>
          
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🔍 View Raw Asset Types Data
            </summary>
            <pre style={{ 
              background: 'white', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '11px',
              maxHeight: '200px'
            }}>
              {JSON.stringify(types, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Console Instructions */}
      <div style={{ 
        background: '#fff3e0', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h3>🔍 Debugging Tips:</h3>
        <ol>
          <li>Press <kbd>F12</kbd> to open DevTools</li>
          <li>Check the <strong>Console</strong> tab for any error messages</li>
          <li>Check the <strong>Network</strong> tab to see API requests:
            <ul>
              <li>Look for requests to <code>/category</code>, <code>/subcategory</code>, <code>/type</code></li>
              <li>Check response status codes (200 = success, 404/500 = error)</li>
              <li>Check response data</li>
            </ul>
          </li>
          <li>If you see "Token not found!" error, the authentication is blocking requests</li>
        </ol>
      </div>

      {/* API Endpoint Info */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>📡 API Endpoints Being Called:</h3>
        <ul>
          <li><code>GET /category</code> - For categories data</li>
          <li><code>GET /subcategory</code> - For sub categories data</li>
          <li><code>GET /type</code> - For asset types data</li>
        </ul>
        <p><strong>Base URL:</strong> {import.meta.env.VITE_SERVER || 'Not configured'}</p>
      </div>
    </div>
  );
}

export default Dashboard;