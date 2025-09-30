function DisplayType({category, sub_category, type}: {category: string, sub_category: string, type: string}) {
    return (
        <div className="flex flex-col justify-start">
            <span className="font-medium text-gray-900 text-sm leading-tight">
                {type}
            </span>
            <span className="text-xs text-gray-500 leading-tight">
                {category} › {sub_category}
            </span>
        </div>
    );
}

export default DisplayType;