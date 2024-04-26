export const appUrl = import.meta.env.APP_URL || 'http://127.0.0.1:8000'
export const isCommunityUsersLength = 20; //
export const maxAvatarFileSize = 3072000; // 3mb

export const maxMessageFileSize = 30720000 // 30mb
export const widthMessageImage = "w-50"; //(50% width)
export const widthMessageVideo = "100%"
export const heightMessageVideo = "auto"
export const widthMessageDocument = "200px"
export const validAvatarFileType = ["image/jpeg", "image/png", "image/gif"];
export const validMessageFileType = {
    'image': [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml"
    ],
    'document': [
        "application/pdf", // For PDF files
        "application/msword", // For Word files (.doc)
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // For Word files (.docx)
        "application/vnd.ms-excel", // For Excel files (.xls)
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // For Excel files (.xlsx)
        "application/vnd.ms-powerpoint", // For PowerPoint files (.ppt)
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // For PowerPoint files (.pptx)
        "text/plain", // For plain text files
        "text/csv", // For CSV files
        "application/rtf", // For RTF files
        "application/vnd.oasis.opendocument.text", // For OpenDocument Text files
    ],
    'audio': [
        "audio/mpeg", // For MP3 files
        "audio/ogg", // For OGG files
        "audio/wav", // For WAV files
        "audio/aac", // For AAC files
        "audio/midi", // For MIDI files
        "audio/webm", // For WebM audio files
        "audio/x-ms-wma", // For WMA files
        "audio/flac" // For FLAC files
    ],
    'video': [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv",
        "video/mpeg"],
};
export const offlineTimeOutWhenLeaveChatChannel = 300000 //ms
