// SearchBar.tsx

import React, { useState } from 'react';

export interface Tag {
    id: number;
    name: string;
}
    
interface Props {
    name: string;
    tagsDatabase: Tag[];
    label?: string;
    onTagsSelected: (selectedTags: Tag[]) => void; // Define the onTagsSelected callback
}

/**
 * Renders a search bar component.
 *
 * @param {Props} props - The props object containing the following properties:
 *   - tagsDatabase: An array of Tag objects representing the database of tags.
 *   - label: The label for the search bar.
 *   - name: The name attribute for the search bar input.
 *   - onTagsSelected: A callback function to be called when tags are selected.
 * @return {ReactElement} The rendered search bar component.
 */
const SearchBar: React.FC<Props> = ({ tagsDatabase, label, name, onTagsSelected }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    /**
     * Updates the search query state based on the input change event.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     * @return {void} This function does not return anything.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    /**
     * Selects a tag and updates the selected tags state.
     *
     * @param {Tag} tag - The tag to be selected.
     * @return {void} This function does not return anything.
     */
    const selectTag = (tag: Tag) => {
        const isTagSelected = selectedTags.some(selectedTag => selectedTag.id === tag.id);
        if (!isTagSelected) {
            const updatedTags = [...selectedTags, tag]; // Update selected tags
            setSelectedTags(updatedTags);
            onTagsSelected(updatedTags); // Pass the updated tags to the callback
        }
    };

    /**
     * Removes a tag with the specified tag ID from the selected tags state.
     *
     * @param {number} tagId - The ID of the tag to be removed.
     * @return {void} This function does not return anything.
     */
    const removeTag = (tagId: number) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
    };

    const filteredTags = searchQuery
        ? tagsDatabase.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <input
                name={name}
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
                        className="cursor-pointer bg-indigo-200 px-3 py-2 mb-2 mr-2 rounded-lg hover:bg-indigo-300"
                    >
                        {tag.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
