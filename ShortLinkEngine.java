import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

/**
 * ShortLink Engine - Componente Java
 * Utilitário profissional para geração de slugs únicos, hash de URLs
 * e verificação de integridade. Pode ser chamado via CLI pelo PHP backend.
 * 
 * Uso:
 *   java ShortLinkEngine generate [length]     - Gera slug aleatório
 *   java ShortLinkEngine hash <url>            - Gera hash SHA-256 da URL
 *   java ShortLinkEngine verify <slug>         - Verifica validade do slug
 *   java ShortLinkEngine info                  - Informações do engine
 */
public class ShortLinkEngine {
    
    private static final String ALPHANUM = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final String ALPHANUM_SAFE = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789"; // Sem caracteres ambíguos
    private static final SecureRandom RANDOM = new SecureRandom();
    
    public static void main(String[] args) {
        if (args.length == 0) {
            printUsage();
            System.exit(1);
        }
        
        String command = args[0].toLowerCase();
        
        switch (command) {
            case "generate":
                int length = args.length > 1 ? Integer.parseInt(args[1]) : 6;
                System.out.println(generateSlug(length));
                break;
                
            case "hash":
                if (args.length < 2) {
                    System.err.println("Erro: URL não fornecida");
                    System.exit(1);
                }
                System.out.println(hashUrl(args[1]));
                break;
                
            case "verify":
                if (args.length < 2) {
                    System.err.println("Erro: Slug não fornecido");
                    System.exit(1);
                }
                System.out.println(isValidSlug(args[1]) ? "VALID" : "INVALID");
                break;
                
            case "info":
                printInfo();
                break;
                
            default:
                System.err.println("Comando desconhecido: " + command);
                printUsage();
                System.exit(1);
        }
    }
    
    /**
     * Gera um slug aleatório criptograficamente seguro.
     * @param length Comprimento do slug (padrão: 6)
     * @return String alfanumérica aleatória
     */
    public static String generateSlug(int length) {
        if (length < 3) length = 3;
        if (length > 32) length = 32;
        
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHANUM_SAFE.charAt(RANDOM.nextInt(ALPHANUM_SAFE.length())));
        }
        return sb.toString();
    }
    
    /**
     * Gera hash SHA-256 de uma URL para verificação de integridade.
     * @param url URL original
     * @return Hash Base64 de 8 caracteres (truncado para uso em slug)
     */
    public static String hashUrl(String url) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(url.getBytes("UTF-8"));
            String base64 = Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
            return base64.substring(0, 8);
        } catch (Exception e) {
            // Fallback em caso de erro criptográfico
            return Integer.toHexString(url.hashCode()).toUpperCase();
        }
    }
    
    /**
     * Verifica se um slug é válido (apenas alfanumérico e hífen).
     * @param slug Slug a verificar
     * @return true se válido
     */
    public static boolean isValidSlug(String slug) {
        return slug != null && slug.matches("^[a-zA-Z0-9-]+$") && slug.length() >= 3 && slug.length() <= 32;
    }
    
    /**
     * Gera slug baseado em hash determinístico da URL (para slugs previsíveis).
     * @param url URL original
     * @param length Comprimento do slug
     * @return Slug determinístico
     */
    public static String generateDeterministicSlug(String url, int length) {
        String hash = hashUrl(url + "salt_v1");
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int idx = (hash.charAt(i % hash.length()) + i) % ALPHANUM.length();
            sb.append(ALPHANUM.charAt(idx));
        }
        return sb.toString();
    }
    
    private static void printUsage() {
        System.out.println("ShortLink Engine v1.0 - Componente Java de Encurtamento");
        System.out.println();
        System.out.println("Uso: java ShortLinkEngine <comando> [args]");
        System.out.println();
        System.out.println("Comandos:");
        System.out.println("  generate [length]  Gera slug aleatório (padrão: 6)");
        System.out.println("  hash <url>         Gera hash SHA-256 da URL");
        System.out.println("  verify <slug>      Verifica validade do slug");
        System.out.println("  info               Exibe informações do engine");
    }
    
    private static void printInfo() {
        System.out.println("{");
        System.out.println("  \"engine\": \"ShortLink Engine\",");
        System.out.println("  \"version\": \"1.0.0\",");
        System.out.println("  \"language\": \"Java\",");
        System.out.println("  \"javaVersion\": \"" + System.getProperty("java.version") + "\"");
        System.out.println("  \"timestamp\": \"" + Instant.now().toString() + "\"");
        System.out.println("}");
    }
}
