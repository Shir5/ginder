import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

export const handleTagsSelected = async (selectedTags: Tag[]): Promise<void> => {
    try {
        console.log('Selected Tags:', selectedTags);

        // Convert selectedTags to an array of tag names
        const tagNames = selectedTags.map(tag => tag.name);

        // Find the Tag entities by their names
        const tags = await prisma.tag.findMany({
            where: {
                name: {
                    in: tagNames
                }
            }
        });
        console.log('Found Tags:', tags);

        // Optionally, perform further processing here

    } catch (error) {
        console.error('Error handling selected tags:', error);
        throw new Error('Failed to handle selected tags');
    }
};
