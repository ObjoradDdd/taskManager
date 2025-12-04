package org.example.task_manager.services.auth;

import jakarta.transaction.Transactional;
import org.example.task_manager.dtos.auth.AuthResponse;
import org.example.task_manager.dtos.auth.LoginRequest;
import org.example.task_manager.dtos.auth.RegisterRequest;
import org.example.task_manager.entities.RefreshToken;
import org.example.task_manager.entities.User;
import org.example.task_manager.repository.RefreshTokenRepository;
import org.example.task_manager.repository.UserRepository;
import org.example.task_manager.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authManager, JwtUtils jwtUtils, RefreshTokenRepository refreshTokenRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setDisplayName(request.displayName());
        user.setPasswordHash(passwordEncoder.encode(request.password()));

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.userName(), request.password())
        );

        User user = userRepository.findByEmail(request.userName());

        String accessToken = jwtUtils.generateToken(user);
        RefreshToken refreshToken = createRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken.getToken());
    }

    public AuthResponse refreshToken(String requestRefreshToken) {
        RefreshToken token = refreshTokenRepository.findFirstByToken(requestRefreshToken).orElseThrow(() -> new RuntimeException("Token not found"));


        if (token.getExpiresAt().toInstant().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired");
        }

        String newAccessToken = jwtUtils.generateToken(token.getUser());

        return new AuthResponse(newAccessToken, requestRefreshToken);
    }

    @Transactional
    public void logout(String refreshTokenString) {
        refreshTokenRepository.deleteByToken(refreshTokenString);
    }


    private RefreshToken createRefreshToken(User user) {
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setExpiresAt(Timestamp.from(Instant.now().plus(30, ChronoUnit.DAYS)));
        token.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(token);
    }
}