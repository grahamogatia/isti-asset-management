function DisplayAsset({asset_name, category, sub_category, type}: {asset_name: string, category: string, sub_category: string, type: string}) {
    return (
        <div className="flex flex-col justify-start gap-1">
            <span className="font-medium text-gray-900 text-sm leading-tight">
                {asset_name}
            </span>
            <span className="text-xs text-gray-400 leading-tight">
                {`${category} › ${sub_category} › ${type}`}
            </span>
        </div>
    );
}

export default DisplayAsset;