import { S3_AVATAR_BASE_URL } from '../config/urls';

export const getS3AvatarUrl = (
    avatarId?: string | null,
    defaultAvatarId: string = 'avatar_1'
): string => {
    const effectiveAvatarId = (avatarId && avatarId.trim() !== '') ? avatarId : defaultAvatarId;
    return `${S3_AVATAR_BASE_URL}${effectiveAvatarId}.png`;
};