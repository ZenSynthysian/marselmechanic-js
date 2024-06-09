import { useLocation } from 'react-router-dom';

function EditProduct() {
    const location = useLocation();
    const { product } = location.state;
    console.log(product);

    return (
        <>
            <div className="">
                <form>
                    <table className="table-auto w-full">
                        <thead className="bg-deepdark bg-opacity-80 text-lightyellow">
                            <tr>
                                <td className="border-r-2 border-deepdark p-3 pb-4">ID</td>
                                <td className="border-r-2 border-deepdark p-3 pb-4">NAMA</td>
                                <td className="border-r-2 border-deepdark p-3 pb-4">HARGA</td>
                                <td className="border-r-2 border-deepdark p-3 pb-4">FOTO</td>
                                <td className="border-r-2 border-deepdark p-3 pb-4 w-[10%]">TOOLS</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-r-2">
                                    <input
                                        type="text"
                                        defaultValue={product.id}
                                        readOnly
                                        className="w-full p-3"
                                    />
                                </td>
                                <td className="border-r-2">
                                    <textarea
                                        type="text"
                                        defaultValue={product.nama}
                                        className="w-full"
                                        required
                                    />
                                </td>
                                <td className="border-r-2">
                                    <input
                                        type="text"
                                        defaultValue={product.harga}
                                        required
                                        className="w-full p-3"
                                    />
                                </td>
                                <td className="border-r-2">
                                    <textarea
                                        type="text"
                                        defaultValue={product.foto}
                                        required
                                        className="w-full"
                                    />
                                </td>
                                <td>
                                    <button type="submit">Done</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default EditProduct;
