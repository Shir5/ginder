import React, { useState } from 'react';

interface Tag {
    id: number;
    name: string;
}

interface Props {
    tagsDatabase: Tag[];
    label?: string;
    onTagsSelected: (selectedTags: Tag[]) => void; // Callback to pass selected tags to parent
}

const SearchBar: React.FC<Props> = ({ tagsDatabase, label, onTagsSelected }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const selectTag = (tag: Tag) => {
        if (!selectedTags.some(selectedTag => selectedTag.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
            // Call the callback to pass selected tags to the parent component
            onTagsSelected([...selectedTags, tag]);
        }
    };

    const removeTag = (tagId: number) => {
        const updatedTags = selectedTags.filter(tag => tag.id !== tagId);
        setSelectedTags(updatedTags);
        // Call the callback to pass selected tags to the parent component
        onTagsSelected(updatedTags);
    };

    const filteredTags = searchQuery
        ? tagsDatabase.filter(tag =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="flex flex-col space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex flex-wrap items-center space-x-2">
                {selectedTags.map(tag => (
                    <div key={tag.id} className="bg-gray-200 p-2 rounded-lg flex items-center">
                        <span className="mr-2">{tag.name}</span>
                        <button onClick={() => removeTag(tag.id)} className="w-4 h-4 z-40">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-lg w-full max-w-md"
            />
            <div className="flex flex-wrap items-center">
                {filteredTags.map(tag => (
                    <div
                        key={tag.id}
                        onClick={() => selectTag(tag)}
                        className="cursor-pointer bg-indigo-200 px-3 py-2 mb-2 mr-2  rounded-lg hover:bg-indigo-300"
                    >
                        {tag.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
